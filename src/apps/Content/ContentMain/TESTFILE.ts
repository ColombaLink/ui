// Table View
export const tableView = {
  type: 'content',
  view: 'table',
  function: {
    name: 'db',
    payload: {
      $id: 'root',
      children: {
        $all: true,
        $list: true,
      },
    },
  },
  props: {
    data: '$data.children',
    headers: [
      {
        key: 'id',
      },
      {
        key: 'numba',
        label: ['from my snup', '$state.mysnurp'],
      },
      {
        key: 'emailtje',
      },
      {
        key: 'createdAt',
      },
    ],
    onClick: {
      overlay: {
        name: '$args.1.name',
        config: {
          type: 'content',
          view: 'table',
          function: {
            name: 'db',
            payload: {
              $id: '$args.1.id',
              $all: true,
            },
          },
          props: {
            data: '$data',
            fields: [
              {
                key: 'id',
                type: 'id',
              },
            ],
          },
        },
      },
    },
  },
}

export const customComponents = {
  type: 'components',
  view: 'list',
  components: [
    {
      component: 'Button',
      props: {
        children: ['Set blah to: flappie '],
        onClick: {
          function: {
            name: 'db:set',
            type: 'function',
            payload: {
              type: 'flappie',
              stringie: 'flippiea',
              numba: 888,
              emailtje: 'in@of.nl',
            },
          },
        },
      },
    },
  ],
}
