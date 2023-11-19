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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { NavigationButton } from "@/components/customs/buttons"
import { Owner, Renter } from "@/config/user-types"
import { useDatabase } from "@/hooks/database"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  date: z.string(),
  type: z.string(),
  amount: z.string(),
})

export default function ChargesCreatePage() {
  const navigate = useNavigate()
  const { create } = useDatabase()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      type: "",
      amount: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await create('Charge', values)

    if (response) {
      toast.success('Charge successfully created.')
      return navigate('/charges')
    }

    return null
  }

  return (
    <AuthLayout>
      <div className="flex justify-end pb-6">
        <NavigationButton label="Back" url="/charges" icon={ArrowLeftIcon} />
      </div>
      <Card className="w-[400px]">
        <Title className="mb-6">Create Charge</Title>
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Date" {...field} />
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
            <Divider />
            <Button type="submit" size="xs" className="px-12">Save</Button>
          </form>
        </Form>
      </Card>
    </AuthLayout>
  )
}
