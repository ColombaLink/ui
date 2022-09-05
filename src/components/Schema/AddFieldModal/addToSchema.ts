import { deepCopy } from '@saulx/utils'
import { Based } from '@based/client'
import safeTypeName from '../safeTypeName'
import { FieldData } from '../fields'
import { FieldOptionsState } from './types'

export default async function addToSchema(
  type: string,
  db: string,
  options: FieldOptionsState,
  fieldData: FieldData,
  originalSchema: any,
  client: Based,
  field?: string
) {
  if (originalSchema) {
    const schema: any = deepCopy(originalSchema)

    if (!schema.languages || !schema.languages.length) {
      schema.languages = ['en']
    }

    // make path
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

    const parsedName = options.fieldName || safeTypeName(options.name)

    const index = Object.keys(schema.types[type].fields).length

    schema.types[type].fields[parsedName] = fieldData.template
      ? deepCopy(fieldData.template)
      : {
          type: fieldData.type,
          meta: {
            name: options.fieldName || options.name,
            id: fieldData.id,
          },
        }

    const fieldDefinition = schema.types[type].fields[parsedName]

    fieldDefinition.meta.index = index

    if (options.description) {
      fieldDefinition.meta.description = options.description
    }

    if (options.isRequired) {
      fieldDefinition.meta.required = true
    }

    if (options.name !== parsedName) {
      fieldDefinition.meta.name = options.name
    }

    if (fieldData.type === 'reference' || fieldData.type === 'reference') {
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
        console.info('ok spannend!')

        const biparsedName =
          options.biDirectionalTarget.fieldName ||
          safeTypeName(options.biDirectionalTarget.name)

        fieldDefinition.bidirectional = {
          fromField: biparsedName,
        }

        if (options.refTypes && options.refTypes.length) {
          options.refTypes.forEach((refType) => {
            // biparsedName

            const target = schema.types[refType]

            if (!target.fields) {
              target.fields = {}
            }

            const index = Object.keys(target.fields).length

            target.fields[biparsedName] = {
              bidirectional: {
                fromField: parsedName,
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
    if (fieldData.type === 'object') {
      fieldDefinition.properties = {}
    }

    await client.updateSchema({ schema, db })
  }
}
