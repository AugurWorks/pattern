import DataSetValue from '../model/DataSetValue';
import MatchingResult from '../model/MatchingResult';

export class MatchingService {

  public getDataSetValues(dataSetValues: DataSetValue[], interval: number): MatchingResult {
    if (dataSetValues.length <= interval) {
      throw new Error(`There are not enough values to run pattern matching`);
    }
    const sortedValues = dataSetValues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const currentValues = sortedValues.slice(0, interval);
    let bestRootMeanSquareError = Infinity;
    let bestMatchingValues;
    for (let offset = 1; offset < dataSetValues.length - interval; offset++) {
      const matchingValues = sortedValues.slice(offset, interval + offset);
      const rmse = matchingValues.reduce((sum, value, index) => {
        return sum + Math.pow(value.value - currentValues[index].value, 2);
      }, 0);
      if (rmse < bestRootMeanSquareError) {
        bestRootMeanSquareError = rmse;
        bestMatchingValues = matchingValues;
      }
    }
    return new MatchingResult(bestRootMeanSquareError, currentValues, bestMatchingValues);
  }
}

export default new MatchingService();
