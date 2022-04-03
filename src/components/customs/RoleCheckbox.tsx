import { FC } from 'react';

type TRoleCheckboxProps = {
  hasRole: boolean;
};

const RoleCheckbox: FC<TRoleCheckboxProps> = ({ hasRole }) => {
  const checkValue = !!hasRole;

  return (
    <div className="d-inline-block form-check management-panel__check-box">
      <input
        className="form-check-input"
        type="checkbox"
        checked={checkValue}
        value="option1"
        onClick={() => {}}
        style={{ margin: '0 auto' }}
      />
    </div>
  );
};

export default RoleCheckbox;
