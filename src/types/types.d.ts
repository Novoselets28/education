declare module 'chart.js' {
    interface ChartOptions {
      scales?: {
        x?: Scale;
        y?: Scale;
      };
    }
  }
  
  export interface ChartDatasetProperties<TType extends ChartType, TData> {
    type?: TType;
    data: TData;
  }
  