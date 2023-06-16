// Viewtje

export const x = {
  type: 'content',
  view: 'table',
  function: {
    name: 'db',
    type: 'query',
    payload: {
      $id: '10bdde6be6',
      children: {
        $list: true,
        title: true,
        id: true,
      },
      $all: true,
    },
    props: {
      data: '$data.children',
      onClick: {
        view: {
          type: 'content-modal',
          function: {
            payload: {
              $id: '$item.id',
              title: true,
              id: true,
            },
          },
          props: {
            data: '$data',
            fields: [
              {
                name: 'Eyyo stirnige',
                field: 'stringie',
                type: 'string',
              },
              {
                name: 'Eyo -> ID',
                field: 'id',
                type: 'id',
              },
            ],
          },
        },
      },
      fields: [
        {
          name: 'SOME STRING',
          field: 'stringie',
          type: 'string',
        },
        {
          name: 'SOME ID',
          field: 'id',
          type: 'id',
        },
        {
          name: 'SNumbaer',
          field: 'numba',
          type: 'number',
        },
        {
          name: 'EMAILE',
          field: 'emailtje',
          type: 'email',
        },
      ],
    },
  },
}

// cOmE SEt soME

export const y = {
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
              stringie: 'flipieflapflapepoa',
              numba: 666,
              emailtje: 'info@flap.nl',
            },
          },
        },
      },
    },
  ],
}
