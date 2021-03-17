export interface NewProjectDoc {
  name: string,
  completed: boolean,
  organization: string,
  branch: string,
  lead: string,
  start: string,
  deadline: string,
  end: string,
  costs: {
    totalSalaray: number,
    totalAssets: number,
    totalCosts: number
  },
  revenue: number,
  profitMargin: number,
  period: number
}
