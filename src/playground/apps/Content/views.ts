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
