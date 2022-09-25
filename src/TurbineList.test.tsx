import { render, screen } from '@testing-library/react';
import { Turbine } from './App';
import { TurbineList } from './TurbineList';

it('should render turbines with critical alerts using the "turbine--critical" class)', async () => {
  const turbines: Turbine[] = [{ turbine: 'T1', warning: 0, critical: 2 }];
  render(<TurbineList turbines={turbines} />);

  const nameDiv = await screen.findByText(/T1/i);

  expect(nameDiv.parentNode).toHaveClass('turbine--critical');
});

it('should render turbines with warning alerts using the "turbine--warning" class)', async () => {
  const turbines: Turbine[] = [{ turbine: 'T1', warning: 1, critical: 0 }];
  render(<TurbineList turbines={turbines} />);

  const nameDiv = await screen.findByText(/T1/i);

  expect(nameDiv.parentNode).toHaveClass('turbine--warning');
});
