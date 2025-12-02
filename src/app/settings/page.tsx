'use client'

import { useState } from 'react'
import { MainLayout, PageHeader } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { defaultUser } from '@/types'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { validateName, validatePassword } from '@/lib/validation'

interface FormErrors {
  name?: string
  password?: string
}

export default function SettingsPage() {
  const [name, setName] = useState('User Random')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setErrors((prev) => ({ ...prev, name: validateName(value) }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
  }

  const handleSave = () => {
    const nameError = validateName(name)
    const passwordError = validatePassword(password)

    setErrors({ name: nameError, password: passwordError })

    if (nameError || passwordError) {
      toast.error('Please fix the errors before saving')
      return
    }

    toast.success('Settings saved successfully')
  }

  return (
    <MainLayout user={defaultUser} rightPanel={true}>
      <PageHeader title='Settings' />

      <div className='mt-8 space-y-6'>
        <div className='flex flex-col gap-2'>
          <label
            className={cn(
              'font-noto text-xs font-semibold leading-[18px]',
              errors.name ? 'text-danger' : 'text-label'
            )}
          >
            Name
          </label>
          <Input
            placeholder='Enter name'
            value={name}
            onChange={handleNameChange}
            className={cn(
              'font-noto h-14 rounded-lg bg-white px-4 text-base placeholder:text-subtle',
              errors.name ? 'border-danger' : 'border-field'
            )}
          />
          {errors.name && (
            <p className='font-noto text-xs text-danger leading-[18px]'>
              {errors.name}
            </p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label
            className={cn(
              'font-noto text-xs font-semibold leading-[18px]',
              errors.password ? 'text-danger' : 'text-label'
            )}
          >
            Password
          </label>
          <Input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={handlePasswordChange}
            className={cn(
              'font-noto h-14 rounded-lg bg-white px-4 text-base placeholder:text-subtle',
              errors.password ? 'border-danger' : 'border-field'
            )}
          />
          {errors.password ? (
            <p className='font-noto text-xs text-danger leading-[18px]'>
              {errors.password}
            </p>
          ) : (
            <p className='font-noto text-xs text-label leading-[18px]'>
              Your password is between 4 and 12 characters
            </p>
          )}
        </div>

        <div className='flex justify-end'>
          <Button
            onClick={handleSave}
            className='w-full max-w-[272px] h-[35px] rounded-[4px] bg-success text-xs font-bold hover:bg-success-hover active:bg-success-active'
          >
            Save
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
