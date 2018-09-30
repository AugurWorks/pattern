import DataSetValue from './DataSetValue';

export default class MatchingResult {

  constructor(
    private rootMeanSquaredError: number,
    private currentValues: DataSetValue[],
    private bestMatch: DataSetValue[]
  ) { }
}
