import { Badge,Button, Card, TextInput, Title } from "@tremor/react"
import { useUserActions } from "../hooks/useUser";
import { useState } from "react";


export function CreateUser() {
  const { addUser } = useUserActions()
  const [result, setResult] = useState < 'ok' |'ko'|null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
     return setResult('ko')
    }

    addUser({name, email, github})
    setResult('ok')
    form.reset()
  }

  return (
    <Card style={{  margin:"auto", width:"400px",}}>
      <Title>Create New User</Title>

    
      <form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Nombre" />
        <TextInput name="email" placeholder="Email"/>
        <TextInput name="github" placeholder="GitHub" />
        <div>
          <Button type="submit"
          style={{marginTop:"16px"}}>
            Crear Usuario
          </Button>
          <span style={{marginLeft:"10px"}}>
            {result === 'ok' && <Badge color="green">
            Guardado Correctamente
            </Badge>}

            {result === 'ko' && <Badge color="red">
            Error con los campos
            </Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}