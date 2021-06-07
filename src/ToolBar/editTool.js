import { Icon } from '@blueprintjs/core';
import React from 'react';
import ToolbarItem from './ToolbarItem';
import { connectToEditor } from '../withEditorProps';

export default connectToEditor(editorState => {
  return {
    readOnly: editorState.readOnly
  };
})(({ toolbarItemProps, readOnly, toggleReadOnlyMode }) => {
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
      onIconClick={toggleReadOnlyMode}
      {...toolbarItemProps}
    />
  );
});
