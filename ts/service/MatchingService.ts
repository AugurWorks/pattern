import DataSetValue from '../model/DataSetValue';
import { MatchingAlgorithm } from '../model/MatchingAlgorithm';
import MatchingResult from '../model/MatchingResult';

export class MatchingService {

  public getDataSetValues(
    dataSetValues: DataSetValue[],
    interval: number,
    algorithm: MatchingAlgorithm): MatchingResult {
    if (dataSetValues.length <= interval) {
      throw new Error(`There are not enough values to run pattern matching`);
    }
    const sortedValues = dataSetValues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const currentValues = sortedValues.slice(0, interval);
    let lowestError = Infinity;
    let bestMatchingValues;
    for (let offset = 1; offset < dataSetValues.length - interval; offset++) {
      const matchingValues = sortedValues.slice(offset, interval + offset);
      const error = this.getError(currentValues, matchingValues, algorithm);
      if (error < lowestError) {
        lowestError = error;
        bestMatchingValues = matchingValues;
      }
    }
    return new MatchingResult(MatchingAlgorithm[algorithm], lowestError, currentValues, bestMatchingValues);
  }

  private getError(current: DataSetValue[], matching: DataSetValue[], algorithm: MatchingAlgorithm): number {
    switch (algorithm) {
      case MatchingAlgorithm.ROOT_MEAN_SQUARED_ERROR:
        return matching.reduce((sum, value, index) => {
          return sum + Math.pow(value.value - current[index].value, 2);
        }, 0);
      default:
        throw new Error(`Unknown matching algorithm ${algorithm}`);
    }
  }
}

export default new MatchingService();
