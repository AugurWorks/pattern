import DataSetValue from './DataSetValue';
import { MatchingAlgorithm } from './MatchingAlgorithm';

export default class MatchingResult {

  constructor(
    private matchingAlgorithm: string,
    private error: number,
    private currentValues: DataSetValue[],
    private bestMatch: DataSetValue[]
  ) { }
}
