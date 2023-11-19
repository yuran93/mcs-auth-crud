import * as z from "zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { AuthLayout } from "@/layouts/auth-layout"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Divider,
  Button,
  Card,
  Title,
} from "@tremor/react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { NavigationButton } from "@/components/customs/buttons"
import { types } from "@/config/user-types"
import { useDatabase } from "@/hooks/database"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  contact: z.string().min(2).max(50),
  type: z.string(),
})

export default function UsersEditPage() {
  const navigate = useNavigate()
  const params = useParams()

  const { update, findByPk } = useDatabase()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      contact: "",
      type: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await update('User', params.id, values)

    if (response) {
      toast.success('User successfully updated.')
      return navigate('/users')
    }

    return null
  }

  const populateFields = async () => {
    const response = await findByPk('User', params.id)

    if (response) {
      form.setValue("name", response.dataValues.name)
      form.setValue("email", response.dataValues.email)
      form.setValue("contact", response.dataValues.contact)
      form.setValue("password", response.dataValues.password)
      form.setValue("type", response.dataValues.type)
      return null
    }

    return null
  }

  useEffect(() => {
    populateFields()
  }, [])

  return (
    <AuthLayout>
      <div className="flex justify-end pb-6">
        <NavigationButton label="Back" url="/users" icon={ArrowLeftIcon} />
      </div>
      <Card className="w-[400px]">
        <Title className="mb-6">Edit User</Title>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {types.map((type) => (
                        <FormItem
                          key={type.value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type.value} />
                          </FormControl>
                          <FormLabel className="font-normal">{type.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Divider />
            <Button type="submit" size="xs" className="px-12">Save</Button>
          </form>
        </Form>
      </Card>
    </AuthLayout>
  )
}
