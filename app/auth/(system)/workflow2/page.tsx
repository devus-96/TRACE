"use client"
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import clsx from "clsx"
import { LoaderCircle } from "lucide-react"

const FormSchema = z.object({
    system: z.enum(["linux", "windows", "apache", "ngnix"], {
      required_error: "You need to select a technologie.",
    }),
  })

export default function Workflow2 () {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        localStorage.setItem('systemSelected', systemSelected)
        console.log(data)
    }

    const systemSelected = form.watch("system");

    return (
        <section className="relative w-full flex justify-center">
            <div className="w-full flex flex-col items-center max-w-[850px] space-y-8 mt-8">
                <p className="text-center text-textColor font-light">You have installed <span className="text-red-500">0/10</span> Conectors</p>
                <h1 className="font-semibold text-3xl text-primary text-center">Install your first TRACE Agent</h1>
                <div className="w-[60%] text-textColor font-light">
                    <p>The trace universal telemetry aganet collects logs and metrics from your systems and applications, you need to connect at least 1 agent even if its on your work station.</p>
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="system"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormControl>
                            <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2"
                            >
                            <div className={clsx("relative flex items-center justify-center cursor-pointer h-24 border", {
                                "border-secondary": systemSelected === 'linux',
                                "border-primary": systemSelected === 'linux',
                            })}>
                                <FormItem>
                                    <FormControl>
                                    <RadioGroupItem value="linux" className="absolute z-2 right-0 w-full h-24 2xl:h-32 cursor-pointer m-auto opacity-0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        <Image src="/linux.svg" alt="linux" width={80} height={80} />
                                        <p>Linux</p>
                                    </FormLabel>
                                </FormItem>
                            </div>
                            <div className={clsx("relative flex items-center justify-center cursor-pointer h-24 border", {
                                "border-secondary": systemSelected === 'windows',
                                "border-primary": systemSelected === 'windows',
                            })}>
                                <FormItem>
                                    <FormControl>
                                    <RadioGroupItem value="windows" className="absolute z-2 right-0 w-full h-24 2xl:h-32 cursor-pointer m-auto opacity-0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        <Image src="/windows.svg" alt="linux" width={80} height={80} />
                                        <p>Windows</p>
                                    </FormLabel>
                                </FormItem>
                            </div>
                            <div className={clsx("relative flex items-center justify-center cursor-pointer h-24 border", {
                                "border-secondary": systemSelected === 'apache',
                                "border-primary": systemSelected === 'apache',
                            })}>
                                <FormItem>
                                    <FormControl>
                                    <RadioGroupItem value="apache" className="absolute z-2 right-0 w-full h-24 2xl:h-32 cursor-pointer m-auto opacity-0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        <Image src="/apache.svg" alt="linux" width={50} height={50} />
                                        <p>Apache</p>
                                    </FormLabel>
                                </FormItem>
                            </div>
                            <div className={clsx("relative flex items-center justify-center cursor-pointer h-24 border", {
                                "border-secondary": systemSelected === 'ngnix',
                                "border-primary": systemSelected === 'ngnix',
                            })}>
                                <FormItem>
                                    <FormControl>
                                    <RadioGroupItem value="ngnix" className="absolute z-2 right-0 w-full h-24 2xl:h-32 cursor-pointer m-auto opacity-0" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        <Image src="/ngnix.svg" alt="linux" width={60} height={60} />
                                        <p>Ngnix</p>
                                    </FormLabel>
                                </FormItem>
                            </div>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={systemSelected === undefined} className={clsx("rounded-none w-full cursor-pointer", {
                        'bg-primary/50': systemSelected === undefined,
                    })}>Continue to agent setUp <LoaderCircle className="h-4 w-4 animate-spin ml-2" />
                    </Button>
                </form>
            </Form>
            </div>
            
        </section>
    )
}
