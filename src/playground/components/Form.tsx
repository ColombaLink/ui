
import { Input, Form as FormComponent, Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Form = () => {
  return (
    <ComponentViewer
      component={FormComponent}
      propsName="FormProps"
      examples={[
        {
          props: {
            children: (
              <>
                <Input
                  label="String"
                  style={{ marginBottom: 24 }}
                  type="text"
                />
                <Input
                  label="Number"
                  type="number"
                  style={{ marginBottom: 24 }}
                />
                <Input
                  type="text"
                  label="With Icon Left"
                  icon={CheckIcon}
                  style={{ marginBottom: 24 }}
                />
                <Input
                  label="Multiline"
                  type="multiline"
                  style={{ marginBottom: 24 }}
                />
                <Input
                  type="text"
                  label="With Background"
                  bg
                  style={{ marginBottom: 24 }}
                />
                <Button>Submit</Button>
              </>
            ),
          },
        },
      ]}
    />
  )
}
