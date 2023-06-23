export const table = {
  type: 'content',
  view: 'table',
  function: {
    name: 'db',
    type: 'query',
    payload: {
      $id: 'root',
      descendants: {
        $list: true,
        name: true,
        id: true,
      },
    },
  },
  props: {
    data: '$data.descendants',
    fields: [
      {
        name: 'NAME!',
        field: 'name',
        type: 'string',
      },
      {
        name: 'SOME ID',
        field: 'id',
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
