export const table = {
  type: 'content',
  view: 'table',
  target: {
    id: 'root',
    type: 'file',
  },
  function: {
    name: 'db',
    type: 'query',
    payload: {
      $id: 'root',
      descendants: {
        $list: {
          $find: {
            $filter: {
              $field: 'type',
              $value: '$target.type',
              $operator: '=',
            },
          },
          $sort: {
            $field: 'createdAt',
            $order: 'desc',
          },
        },
        name: true,
        id: true,
      },
    },
  },
  props: {
    button: {
      // add select type
      onClick: {
        // SELECT from list as an option in view
        function: {
          name: 'db:set',
          payload: {
            parents: ['$target.id'],
            name: 'New item',
            type: '$target.type', // make config
          },
        },
      },
      children: ['Add ', '$target.type'],
    },

    onClick: {
      target: {
        id: '$args.1.id',
      },
      overlay: 'vimodal',
    },

    data: '$data.descendants',
    headers: [
      {
        name: 'NAME!',
        key: 'name',
        type: 'string',
      },
      {
        name: 'SOME ID',
        key: 'id',
        type: 'id',
      },
    ],
  },
}

export const button = {
  type: 'components',
  view: 'list',
  components: [
    {
      component: 'Button',
      props: {
        children: ['Add an empty file'],
        onClick: {
          function: {
            name: 'db:set',
            type: 'function',
            payload: {
              type: 'file',
              name: 'NEW FILE! ',
            },
          },
        },
      },
    },
  ],
}

export const contentEditModal = {
  type: 'content-modal',
  hidden: true,
  function: {
    name: 'db',
    payload: {
      $id: '$target.id',
      $all: true,
    },
  },
  props: {
    data: '$data',
    fields: [
      {
        name: 'NAME!',
        key: 'name',
        type: 'string',
      },
      {
        name: 'SOME ID',
        key: 'id',
        type: 'id',
      },
    ],
  },
}
