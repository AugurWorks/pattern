import DataSetValue from '../model/DataSetValue';
import { MatchingAlgorithm } from '../model/MatchingAlgorithm';
import MatchingResult from '../model/MatchingResult';

export class MatchingService {

  public getDataSetValues(
    dataSetValues: DataSetValue[],
    duration: number,
    offset: number,
    algorithm: MatchingAlgorithm): MatchingResult {
    if (dataSetValues.length <= duration) {
      throw new Error(`There are not enough values to run pattern matching`);
    }
    const sortedValues = dataSetValues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const currentValues = sortedValues.slice(0, duration);
    let lowestError = Infinity;
    let bestMatchingValues;
    for (let durationOffset = offset; durationOffset < dataSetValues.length - duration; durationOffset += offset) {
      const matchingValues = sortedValues.slice(durationOffset, duration + durationOffset);
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
      case MatchingAlgorithm.VOLATILITY:
        return Math.abs(this.volatility(current) - this.volatility(matching));
      default:
        throw new Error(`Unknown matching algorithm ${algorithm}`);
    }
  }

  private volatility(dataSetValues: DataSetValue[]): number {
    const avg = dataSetValues.reduce((sum, dataSetValue) => sum + dataSetValue.value, 0) / dataSetValues.length;
    return dataSetValues.reduce((sum, dataSetValue) => sum + Math.pow(dataSetValue.value - avg, 2), 0);
  }
}

export default new MatchingService();
