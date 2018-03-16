export type SchemaProps = {
  name: string;
  field: string;
  onChange: (field: string, newValue: any) => void;
  open: boolean;
  value: any;
};
