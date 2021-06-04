/* eslint-disable prefer-rest-params */
import { startCase } from 'lodash'; // Generic factory function to create command objects.
// TODO add documentation

export function genericCommandFactory(config) {
  const out = {}; // eslint-disable-next-line no-unused-vars

  const _loop = function _loop(cmdId) {
    const def = config.commandDefs[cmdId];
    const command = {
      id: cmdId
    };

    command.execute = function () {
      for (
        let _len = arguments.length, execArgs = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        execArgs[_key] = arguments[_key];
      }

      config.handleReturn(
        cmdId,
        // eslint-disable-next-line no-undef
        def.handler && def.handler.apply(command, config.getArguments(cmdId, execArgs))
      );
    };

    const properties = [
      'icon',
      'name',
      'component',
      'shortName',
      'description',
      'hotkey',
      'hotkeyProps',
      'isDisabled',
      'submenu',
      'isActive',
      'isHidden',
      'tooltip',
      'inactiveIcon',
      'inactiveName'
    ];
    properties.forEach(function (prop) {
      if (def[prop] !== undefined) {
        if (typeof def[prop] === 'function') {
          Object.defineProperty(command, prop, {
            get: function get() {
              return def[prop].apply(command, config.getArguments(cmdId, []));
            }
          });
        } else {
          command[prop] = def[prop];
        }
      }
    }); // If no name was specified in the definition, let's try to give some
    // auto-generated names

    if (!def.name) {
      command.name = startCase(cmdId);

      if (def.toggle && cmdId.startsWith('toggle')) {
        command.name = startCase(cmdId.replace('toggle', def.toggle[0] || ''));
        command.inactiveName = startCase(cmdId.replace('toggle', def.toggle[1] || ''));
        command.shortName = startCase(cmdId.replace('toggle', ''));
      }
    }

    out[cmdId] = command;
  };

  // eslint-disable-next-line guard-for-in
  for (const cmdId in config.commandDefs) {
    _loop(cmdId);
  }

  return out;
}
export function oveCommandFactory(instance, commandDefs) {
  console.log(instance, commandDefs);
  const xx = genericCommandFactory({
    getArguments: (cmdId, [ctxInfo]) => {
      const args = [instance.props];
      const { store, editorName } = instance.props;
      if (store && editorName) {
        args.push(store.getState().VectorEditor[editorName]);
      }
      if (ctxInfo) args.push(ctxInfo);
      return args;
    },
    handleReturn: () => {},
    commandDefs
  });

  return xx;
}
