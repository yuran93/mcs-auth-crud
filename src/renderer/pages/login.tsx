import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PublicLayout } from "@/layouts/public-layout"
import { useAuth } from "@/hooks/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import icon from "../../../assets/icon.png"

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(2).max(50),
})

export default function LoginPage() {
  const { attemptLogin } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    attemptLogin(values.email, values.password)
  }

  return (
    <PublicLayout>
      <Card className="w-[350px] p-3">
        <CardContent>
          <div className="flex flex-col items-center p-12">
            <img className="mb-3" src={icon} width={80} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Log in</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PublicLayout>
  )
}
