export type TimeSeriesData = {
  // X-axis labels
  labels: Array<string>;
  // Series
  datasets: Array<{
    // Series label
    label: string;
    // Values in series
    data: Array<number>;
    // Styling
    strokeColor?: string;
    pointColor?: string;

    id?: string;
    slug?: string;
  }>;
};

export type TabularData = Array<
  [string | {href: string; title: string}, number]
>;

export type GeographicData = Array<[string, string, string | number]>;
export type GranularGeographicData = Array<{
  lat: string;
  lon: string;
  label: string;
  count: number;

  // TODO: Remove this hack.
  code?: string;
}>;

export type BreakdownData = Array<{label: string; value: number}>;

export type MenuData = Array<{label: string; value: string}>;

export type Data =
  | TabularData
  | TimeSeriesData
  | GeographicData
  | GranularGeographicData
  | BreakdownData
  | MenuData;

export type Episode = {
  id: string;
  title: string;
  publish: string; // ISO-8601 date
  podcastSlug: string;
  position: number;
};
