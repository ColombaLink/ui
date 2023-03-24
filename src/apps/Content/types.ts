export type ViewQuery = any

export type Filter = {
  $operator?: string
  $value?: string | number
  $field?: string
  $and?: Filter
  $or?: Filter
}

export const isFilter = (filter: any): filter is Filter => {
  if (filter && typeof filter === 'object') {
    return true
  }
  return false
}

/*
    Make this a type..

    $filter: {
    $field: 'bla'
    $operator: '=',
    $value: 'blub',
    $or: {
      $field: 'bla',
      $operator: '=',
      $value: 'blub',
    }
  }
  // 1
  const a = b && c || d
  $filter: {
    $field: 'type',
    $operator: '=',
    $value: 'yvestype',
    $and: {
      $field: 'name',
      $operator: '=',
      $value: 'yves',  
    },
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'youri',
    }
  }

  // 2
  const a = b || c && d
    $filter: {
    $field: 'type',
    $operator: '=',
    $value: 'yvestype',
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'yves',
      $and: {
        $field: 'name',
        $operator: '=',
        $value: 'youri',
      }
    }
  }

  $filter: [{
    $field: 'type',
    $operator: '=',
    $value: 'yves',
    $and: {
      $field: 'name',

    }
  }, {
    $field: 'name',
    $operator: '=',
    $value: 'yves',
    $or: {
      $field: 'name',
      $operator: '=',
      $value: 'youri',
    }
  }]

  this AND (taht OR smurf)
  (this AND taht) OR smurf
*/

export type View = { id: string; query: ViewQuery; label: string }
