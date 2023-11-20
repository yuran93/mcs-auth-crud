import * as z from "zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Divider, Title } from "@tremor/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PublicLayout } from "@/layouts/public-layout"
import { useAuth } from "@/hooks/auth"
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Owner, Renter } from "@/config/user-types"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  contact: z.string().min(2).max(50),
  type: z.string(),
  upiId: z.string().nullable(),
})

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      contact: "",
      type: "",
      upiId: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    register(values)
  }

  return (
    <PublicLayout>
      <Card className="w-[450px] p-3">
        <CardContent>
          <Title className="py-6">Register</Title>
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
                name="upiId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UPI ID</FormLabel>
                    <FormControl>
                      <Input placeholder="UPI ID" {...field} />
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Charge Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={Renter} />
                          </FormControl>
                          <FormLabel className="font-normal">Renter</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={Owner} />
                          </FormControl>
                          <FormLabel className="font-normal">Owner</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Register</Button>
              <Divider />
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PublicLayout>
  )
}
