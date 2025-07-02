"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyShema } from "@/types/schema";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox"

// "@/types/form.ts"
export type userData = z.infer<typeof companyShema>;

export default function WorkflowPage1 () {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(false)

    const form = useForm<userData>({
        resolver: zodResolver(companyShema),
        defaultValues: {
            name: "",
            url: '',
            terms: false
        },
    });

    const create = async (data: userData) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            
        } catch (error: any) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            setErrorMessage(error.message || "Une erreur inattendue est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = async (values: userData) => {
        console.log(values)
        await create(values);
    };

    const termsAccepted = form.watch("terms");

    React.useEffect(() => {
        setDisabled(!termsAccepted);
    }, [termsAccepted]);

    return (
        <section className="w-full text-primary space-y-8">
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name" className="text-2xl font-semibold">What is your companies <br/> Name ?</Label>
                    <Input
                        id="name"
                        type="text"
                        className={clsx("rounded-none py-1.5", {
                            "border border-red-500" : form.formState.errors.name?.message !== undefined,
                            "border border-[#33475B]" : form.formState.errors.name?.message === undefined
                        })}
                        onFocus={() => form.formState.errors.name === undefined}
                        {...form.register("name")}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email" className="text-2xl font-semibold">What is your companies <br /> Website URL ?</Label>
                    <Input
                        id="url"
                        type="text"
                        className={clsx("rounded-none py-1.5", {
                            "border border-red-500" : form.formState.errors.url?.message !== undefined,
                            "border border-[#33475B]" : form.formState.errors.url?.message === undefined
                        })}
                        {...form.register("url")}
                    />
                </div>
                <div className='w-fit flex items-center mt-4'>
                    <div className="mr-1">By clicking on “Sign up”, I agree to TRACE  <Link href='/auth/login' className="text-secondary">Terms of Service</Link>   and acknowledge its  <Link href='/auth/login' className="text-secondary">Privacy policy</Link>. </div>
                </div>
                <div className="flex items-center gap-3">
                    <Controller
                        name="terms"
                        control={form.control}
                        render={({ field }) => (
                            <Checkbox
                                id="terms"
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => {
                                    field.onChange(checked);
                                }}
                                onBlur={field.onBlur}
                                ref={field.ref}
                            />
                        )}
                    />
                    <Label htmlFor="terms">Yes</Label>
                </div>
                <Button
                    type="submit" // Très important pour déclencher la soumission du formulaire
                    className={clsx("w-full rounded-none text-white border border-primary cursor-pointer hover:bg-white hover:text-primary", {
                        'bg-primary/50': disabled || form.formState.isSubmitting,
                        'bg-primary': !(disabled || form.formState.isSubmitting),
                    })}
                    disabled={disabled || form.formState.isSubmitting}
                >
                    {isLoading ? (
                        <>
                            Processing <LoaderCircle className="h-4 w-4 animate-spin ml-2" />
                        </>
                    ) : (
                        "Next"
                    )}
                </Button>
            </form>
        </section>
    );
}