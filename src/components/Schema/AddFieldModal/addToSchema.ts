import { deepCopy } from '@saulx/utils'
import { Based } from '@based/client'
import safeTypeName from '../AddTypeModal/safeTypeName'
import { FieldOptionsState } from './types'
import { templates } from '../fields'

export default async function addToSchema(
  type: string,
  db: string,
  options: FieldOptionsState,
  template: string,
  originalSchema: any,
  client: Based,
  fieldName?: string
) {
  if (originalSchema) {
    const schema: any = deepCopy(originalSchema)
    const fieldDefinition = deepCopy(templates[template].schema)

    if (!fieldName) {
      if (!schema.languages || !schema.languages.length) {
        schema.languages = ['en']
      }

      if (!schema.types) {
        schema.types = {}
      }

      if (!schema.types[type]) {
        schema.types[type] = {}
      }

      if (!schema.types[type].fields) {
        schema.types[type].fields = {}
      }

      if (!options.name) {
        throw new Error('Name is required')
      }

      fieldName = options.fieldName || safeTypeName(options.name)
    }

    if (fieldDefinition.meta === undefined) {
      fieldDefinition.meta = {}
    }

    fieldDefinition.meta.index = Object.keys(schema.types[type].fields).length

    if (options.description) {
      fieldDefinition.meta.description = options.description
    }

    if (options.isRequired) {
      fieldDefinition.meta.required = true
    }

    if (options.name !== fieldName) {
      fieldDefinition.meta.name = options.name
    }

    if (
      fieldDefinition.type === 'reference' ||
      fieldDefinition.type === 'reference'
    ) {
      if (options.fileTypes) {
        fieldDefinition.meta.fileTypes = options.fileTypes
      }
      if (options.refType === 'single') {
        fieldDefinition.type = 'reference'
      } else {
        fieldDefinition.type = 'references'
      }
      if (options.refTypes) {
        fieldDefinition.meta.refTypes = options.refTypes
      }

      if (
        options.isBidirectional &&
        options.biDirectionalTarget &&
        options.biDirectionalTarget.name
      ) {
        const bifieldName =
          options.biDirectionalTarget.fieldName ||
          safeTypeName(options.biDirectionalTarget.name)

        fieldDefinition.bidirectional = {
          fromField: bifieldName,
        }

        if (options.refTypes && options.refTypes.length) {
          options.refTypes.forEach((refType) => {
            // bifieldName

            const target = schema.types[refType]

            if (!target.fields) {
              target.fields = {}
            }

            const index = Object.keys(target.fields).length

            target.fields[bifieldName] = {
              bidirectional: {
                fromField: fieldName,
              },
              type:
                //  @ts-ignore
                options.biDirectionalTarget.refType === 'single'
                  ? 'reference'
                  : 'references',
              meta: {
                //  @ts-ignore
                name: options.biDirectionalTarget.name,
                index,
                refTypes: [type],
                //  @ts-ignore
                description: options.biDirectionalTarget.description || '',
              },
            }
          })
        } else {
          throw new Error('Do not support bi direction without refTypes')
        }
      }
    }

    // for all
    if (fieldDefinition.type === 'object') {
      fieldDefinition.properties = {}
    }

    schema.types[type].fields[fieldName] = fieldDefinition

    await client.updateSchema({ schema, db })
  }
}
