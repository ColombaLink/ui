export const itemTable = {
  type: 'content',
  view: 'table',
  target: {
    id: 'root',
    type: 'item',
    name: 'Items',
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
        startingPrice: true,
        picture: {
          id: true,
          src: true,
        },
        type: true,
        children: true,
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
          // want to open an overlay
          name: 'db:set',
          payload: {
            name: 'New item',
            type: '$target.type', // make config
          },
        },
      },
      children: ['Add ', '$target.type'],
    },
    name: ['$target.name'],
    onClick: {
      target: {
        id: '$args.1.id',
        name: '$args.1.name',
      },
      overlay: 'vimodal',
    },
    data: '$data.descendants',
    headers: [
      {
        width: 60,
        label: '',
        key: 'picture.src',
        type: 'reference',
        meta: { type: 'file', mime: 'image' },
      },
      {
        label: 'name',
        key: 'name',
        type: 'string',
      },
      {
        name: 'Starting price',
        key: 'starting price',
        type: 'number',
      },
      {
        nlabelame: 'id',
        key: 'id',
        type: 'id',
      },
    ],
  },
}

export const table = {
  type: 'content',
  view: 'table',
  target: {
    id: 'root',
    type: 'file',
    name: 'Files',
  },
  function: {
    name: 'db',
    type: 'query',
    payload: {
      $id: '$target.id',
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
        type: true,
        children: true,
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
          // want to open an overlay
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
    name: ['$target.name'],
    onClick: {
      target: {
        id: '$args.1.id',
        name: '$args.1.name',
      },
      overlay: 'vimodal',
    },
    data: '$data.descendants',
    headers: [
      {
        name: 'name!',
        key: 'name',
        type: 'string',
      },
      {
        name: 'SOME ID',
        key: 'id',
        type: 'id',
      },
      {
        name: 'Children',
        key: 'children',
        type: 'references',
        onClick: {
          target: {
            id: '$args.1.id',
            name: '$args.1.name',
            type: '$args.1.type',
          },
          view: 'vitable',
        },
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
      $language: 'en',
      $id: '$target.id',
      $all: true,
      picture: { id: true, src: true },
    },
  },
  props: {
    saveButton: {
      fill: true,
      large: true,
      textAlign: 'center',
      children: 'Publish',
      onClick: {
        function: {
          name: 'db:set',
          payload: {
            $id: '$target.id',
            type: '$target.type',
            name: '$state.name',
            startingPrice: '$state.startingPrice',
            picture: '$state.picture.id',
          },
        },
      },
    },
    // history
    name: ['$target.name'],
    data: '$data',
    fields: [
      {
        name: 'Title',
        key: 'title',
        type: 'string',
      },
      {
        name: 'Starting price',
        key: 'startingPrice',
        type: 'number',
      },
      {
        name: 'Picture',
        key: 'picture',
        type: 'reference',
        meta: { type: 'file', mime: 'image' },
      },
    ],
  },
}
