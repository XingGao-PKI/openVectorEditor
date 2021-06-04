import { Icon } from '@blueprintjs/core';
import React from 'react';
import ToolbarItem from './ToolbarItem';
import { ReadOnlyContext } from '../Context/ReadOnlyContext';

export default ({ toolbarItemProps }) => {
  const { readOnly, toggleReadOnly } = React.useContext(ReadOnlyContext);
  console.log(readOnly)
  const tooltip = (
    <span>
      Switch to {readOnly ? 'edit' : 'read only'} mode{' '}
      <span style={{ fontSize: 10 }}>(Cmd/Ctrl+E)</span>
    </span>
  );

  return (
    <ToolbarItem
      tooltip={tooltip}
      Icon={<Icon icon={readOnly ? 'lock' : 'unlock'} />}
      onIconClick={toggleReadOnly}
      {...toolbarItemProps}
    />
  );
};
