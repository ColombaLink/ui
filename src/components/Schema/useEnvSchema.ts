import useEnv from '~/hooks/useEnv'
import { useData, useSchema, useClient } from '@based/react'
import { Based } from '@based/client'
import { orgId } from '@based/ids'

export type EnvSchema = {
  schema: any
  db: string
  client: Based
  isEmpty: boolean
  loading: boolean
  id: string
  env: {
    org: string
    project: string
    env: string
  }
}

export const useEnvSchema = (id: string): EnvSchema => {
  const env = useEnv(id)

  // used to check dbs
  // const { data } = useData({
  //   $id: id,
  //   services: {
  //     id: true,
  //     args: { $default: { name: "default" } },
  //     dist: {
  //       name: true,
  //       $find: {
  //         $traverse: "parents",
  //         $filter: {
  //           $field: "type",
  //           $operator: "=",
  //           $value: "serviceDist",
  //         },
  //       },
  //     },
  //     $list: {
  //       $find: {
  //         $traverse: "children",
  //         $filter: {
  //           $field: "type",
  //           $operator: "=",
  //           $value: "service",
  //         },
  //       },
  //     },
  //   },
  // });

  //   const [dbOptions, setDbOptions] = useState([]);

  //   useEffect(() => {
  //     if (data.services) {
  //       setDbOptions(
  //         data.services
  //           .filter((v) => {
  //             return v.dist.name === "@based/db-env-default";
  //           })
  //           .map((v) => ({
  //             value: v.args.name,
  //           }))
  //       );
  //     }
  //   }, [data.services?.length]);

  //   const db = dbOptions.find((v) => v.value === path[4]);

  const db = 'default'

  const normalClient = useClient()

  // if false then dont show
  const client = useClient({
    ...env,
    cluster: normalClient.opts.cluster,
  })

  const token = normalClient.getToken()

  if (client) {
    client.auth(token, { isBasedUser: true })
  }

  const { schema, loading } = useSchema(db, {
    ...env,
    cluster: normalClient.opts.cluster,
  })

  const isEmpty = schema.types ? Object.keys(schema.types).length < 2 : true

  return {
    isEmpty,
    db,
    loading,
    schema,
    client,
    id,
    env,
  }
}
