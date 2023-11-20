import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
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
import { Input } from "@/components/ui/input"
import { NavigationButton } from "@/components/customs/buttons"
import { useDatabase } from "@/hooks/database"
import { useAuthStore } from "@/stores/auth"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  amount: z.string(),
})

export default function ActionsPayPage() {
  const navigate = useNavigate()
  const { create } = useDatabase()
  const user = useAuthStore((state) => state.user)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      UserId: user?.id,
      date: new Date,
      ...values,
    }

    const response = await create('Collection', data)

    if (response) {
      toast.success('Successfully paid.')
      return navigate('/')
    }

    return null
  }

  return (
    <AuthLayout>
      <div className="flex justify-end pb-6">
        <NavigationButton label="Back" url="/collections" icon={ArrowLeftIcon} />
      </div>
      <Card className="w-[400px]">
        <Title className="mb-6">Pay Dues</Title>
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
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Divider />
            <Button type="submit" size="xs" className="px-12">Proceed Pay</Button>
          </form>
        </Form>
      </Card>
    </AuthLayout>
  )
}
