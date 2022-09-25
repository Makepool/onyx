import classNames from 'classnames';
import './TurbineList.scss';
import { Turbine } from './App';

interface Props {
  turbines: Turbine[];
}

export function TurbineList({ turbines }: Props) {
  return (
    <>
      {turbines.map((turbine) => {
        return (
          <div
            key={turbine.turbine}
            className={classNames({
              turbine: true,
              'turbine--critical': turbine.critical,
              'turbine--warning': turbine.warning,
            })}
          >
            <div className="turbine__name">{turbine.turbine}</div>
            <div className="turbine__critical">
              Critical: {turbine.critical}
            </div>
            <div className="turbine__warning">Warning: {turbine.warning}</div>
          </div>
        );
      })}
    </>
  );
}
