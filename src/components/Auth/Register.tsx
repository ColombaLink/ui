import { FC, useState } from 'react'
import { Input } from '../Input'
import { Button } from '../Button'
import { useClient } from '@based/react'
import { LockIcon, CheckIcon, CloseIcon, ErrorIcon } from '~/icons'
import { Callout } from '../Callout'
import { email as isEmail, validatePassword } from '@saulx/validators'
import { border, color, renderOrCreateElement } from '~/utils'
import { Separator } from '../Separator'
import { GoogleButton } from './GoogleButton'
import { MicrosoftButton } from './MicrosoftButton'
import { GithubButton } from './GithubButton'
import { Text } from '../Text'

const WaitingScreen: FC<{ email: string }> = ({ email }) => {
  return (
    <div>
      <Text textAlign="center" size={32} wrap style={{ marginBottom: 24 }}>
        Check your email...
      </Text>
      <Text textAlign="center" wrap style={{ marginBottom: 24 }}>
        This page will update automatically when you open the email link.
      </Text>
      <Text textAlign="center" color="text2" style={{ marginBottom: 24 }}>
        We just sent an email to {email}
      </Text>
      <Text textAlign="center" color="text2" style={{ marginBottom: 24 }}>
        Confirm your email address to continue
      </Text>
    </div>
  )
}

type RegisterProps = {
  width?: number | string
  email?: string
  onRegister?: (data: { email: string; password: string; name: string }) => void
  googleClientId?: string
  microsoftClientId?: string
  githubClientId?: string
}

export const Register: FC<RegisterProps> = ({
  email: initialEmail = '',
  width = '100%',
  onRegister,
  googleClientId,
  microsoftClientId,
  githubClientId,
}) => {
  const client = useClient()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [name, setName] = useState('')
  const [waitingForEmailConfirmation, setWaitingForEmailConfirmation] =
    useState(false)
  const passwordScore = validatePassword(password)
  const passwordIsValid = passwordScore.valid && password === cpassword
  const valid = isEmail(email) && passwordIsValid
  const passwordValidationMessage = password ? `${passwordScore.info}` : null
  const passwordPercentage = Math.min(passwordScore.entropy, 100) + '%'
  const passWordColor =
    passwordScore.entropy < 50
      ? 'red'
      : passwordScore.entropy < 60
        ? 'yellow'
        : 'green'

  const PasswordIcon =
    passwordScore.entropy < 60
      ? ErrorIcon
      : passwordScore.entropy < 99
        ? CheckIcon
        : () => <div>🏆</div>

  return waitingForEmailConfirmation ? (
    <WaitingScreen email={email} />
  ) : (
    <div
      style={{
        width,
      }}
    >
      {googleClientId || microsoftClientId || githubClientId ? (
        <>
          {googleClientId ? (
            <GoogleButton
              width={width}
              label="Signup with Google"
              clientId={googleClientId}
            />
          ) : null}
          {microsoftClientId ? (
            <MicrosoftButton
              width={width}
              label="Signup with Microsoft"
              clientId={microsoftClientId}
            />
          ) : null}
          {githubClientId ? (
            <GithubButton
              width={width}
              label="Signup with GitHub"
              clientId={githubClientId}
            />
          ) : null}
          <Separator style={{ marginTop: 16, marginBottom: 16 }}>
            <Text color="text2" size={14} weight={500}>
              OR
            </Text>
          </Separator>
        </>
      ) : null}
      <Input
        style={{ marginBottom: 16 }}
        large
        label="Name"
        type="text"
        name="name"
        placeholder="Enter your full name"
        onChange={setName}
      />

      <Input
        type="email"
        large
        label="Email"
        style={{ marginBottom: 16 }}
        // icon={EmailIcon}
        value={email}
        placeholder="Email address"
        onChange={setEmail}
      />
      <Input
        large
        label="Password"
        style={{ marginBottom: 16 }}
        // icon={LockIcon}
        type="password"
        placeholder="Password"
        onChange={setPassword}
      />

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: passwordScore.valid ? 248 : 0,
          overflow: 'hidden',
        }}
      >
        <Input
          large
          icon={
            !cpassword
              ? LockIcon
              : passwordIsValid
                ? renderOrCreateElement(CheckIcon, { color: 'green' })
                : renderOrCreateElement(CloseIcon, { color: 'red' })
          }
          style={{ marginBottom: 24 }}
          name="confirm-password"
          type="password"
          placeholder="Confirm password"
          onChange={setCPassword}
        />
      </div>

      <div
        style={{
          transition: 'max-height 0.4s ease-out',
          maxHeight: passwordValidationMessage ? 248 : 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: passwordPercentage,
            height: 4,
            border: border(1, passWordColor),
            backgroundColor: color(passWordColor),
            borderRadius: 10,
            marginBottom: 16,
            transition: 'width 0.2s',
          }}
        />

        <Callout
          style={{ marginBottom: 24 }}
          icon={renderOrCreateElement(PasswordIcon, { color: passWordColor })}
          label={
            passwordScore.entropy < 50
              ? 'Password is too weak, add capitals, symbols or make it longer'
              : passwordValidationMessage
          }
        />
      </div>

      <Button
        disabled={!valid}
        fill
        textAlign="center"
        large
        style={{ height: 48 }}
        keyboardShortcut="Enter"
        onClick={async () => {
          setWaitingForEmailConfirmation(true)
          try {
            // @ts-ignore
            const result = await client.register({
              email,
              password,
              name,
              redirectUrl: window.location.href,
            })
            console.info(result)
            if (onRegister) {
              // @ts-ignore
              onRegister(result)
            }
          } catch (err) {
            setWaitingForEmailConfirmation(false)
            console.error(err)
          }
        }}
      >
        Sign up
      </Button>
    </div>
  )
}
