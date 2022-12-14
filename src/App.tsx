import React, { useEffect, useState } from 'react';
import './App.scss';
import { TurbineList } from './TurbineList';

enum Alert {
  Warning = 1,
  Critical,
}

export interface Turbine {
  turbine: string;
  warning: number;
  critical: number;
}

interface TurbineAPI {
  turbine: string;
  level: Alert;
  count: number;
}

function App() {
  const [error, setError] = useState(false);
  const [turbines, setTurbines] = useState<Turbine[]>([]);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);
  const [unfilteredTurbines, setUnfilteredTurbines] = useState<Turbine[]>([]);

  function errorHandler(error: any) {
    console.error(error);
    setError(true);
  }

  function toggle(value: boolean): boolean {
    return !value;
  }

  useEffect(() => {
    const turbinesToShow = showOnlyErrors
      ? unfilteredTurbines.filter(
          (turbine) => turbine.critical || turbine.warning
        )
      : unfilteredTurbines;

    setTurbines(turbinesToShow);
  }, [showOnlyErrors, unfilteredTurbines]);

  useEffect(() => {
    fetch('https://run.mocky.io/v3/6a13fe7e-840c-4d82-b58f-c737139f0e55')
      .then((response) => {
        if (response.status !== 200) {
          errorHandler(response.status);
          return;
        }

        response
          .json()
          .then((result: TurbineAPI[]) => {
            const turbineList: Turbine[] = [];
            for (let i = 1; i <= 100; i++) {
              turbineList.push({
                turbine: `T${i}`,
                warning: 0,
                critical: 0,
              });
            }

            result.forEach((r) => {
              let turbine = turbineList.find((t) => t.turbine === r.turbine);
              if (turbine) {
                if (r.level === Alert.Warning) {
                  turbine.warning = r.count;
                }
                if (r.level === Alert.Critical) {
                  turbine.critical = r.count;
                }
              }
            });

            setUnfilteredTurbines(turbineList);
          })
          .catch((error) => errorHandler(error));
      })
      .catch((error) => errorHandler(error));
  }, []);

  if (error) {
    return <div>There has been an error.</div>;
  }

  if (turbines.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <div className="filters">
        Filters:
        <label>
          <input
            type="checkbox"
            name="checkbox"
            checked={showOnlyErrors}
            onChange={() => setShowOnlyErrors(toggle)}
          />
          Show alerts only
        </label>
      </div>
      <TurbineList turbines={turbines} />
    </div>
  );
}

export default App;
