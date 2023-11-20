import * as z from "zod"
import { toast } from "sonner"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
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
import { useDatabase } from "@/hooks/database"
import { Owner, Renter } from "@/config/user-types"
import { toDateString } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  date: z.string().min(2).max(50),
  amount: z.string(),
  type: z.string(),
})

export default function CollectionsEditPage() {
  const navigate = useNavigate()
  const params = useParams()

  const { update, findByPk } = useDatabase()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      amount: "",
      type: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await update('Collection', params.id, values)

    if (response) {
      toast.success('Collection successfully updated.')
      return navigate('/collections')
    }

    return null
  }

  const populateFields = async () => {
    const response = await findByPk('Collection', params.id)

    if (response) {
      form.setValue("name", response.name)
      form.setValue("date", toDateString(response.date))
      form.setValue("amount", response.amount)
      form.setValue("type", response.type)
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
        <NavigationButton label="Back" url="/collections" icon={ArrowLeftIcon} />
      </div>
      <Card className="w-[400px]">
        <Title className="mb-6">Edit Collection</Title>
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
                  <FormLabel>Collection Type</FormLabel>
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
