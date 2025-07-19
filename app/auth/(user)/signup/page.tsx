"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { InputPasswrd } from "@/components/ui/passwordInput";
import MyPhoneInput from "@/components/ui/phoneNumInput";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// "@/types/form.ts"
export type userData = z.infer<typeof userSchema>;

// Pour la gestion du champ MyPhoneInput, vous devrez utiliser Controller de react-hook-form
import { Controller } from 'react-hook-form';
import { userSchema } from "@/types/schema";
import clsx from "clsx";


export default function SignupPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<userData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            tel: "",
            password: ""
        },
    });

    const create = async (data: userData) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            console.log(data)
        } catch (error: unknown) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            if (error instanceof Error) {
                setErrorMessage(error?.message || "Une erreur inattendue est survenue.");
            }
        } finally {
            setIsLoading(false);
            console.log(errorMessage)
        }
    };

    const onSubmit = async (values: userData) => {
        await create(values);
    };

    return (
        <section className="w-full text-primary space-y-8">
            <div>
                <h1 className="font-semibold text-4xl">Let’s sign you up.</h1>
                <p className="font-light">Create your TRACE account.</p>
            </div>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="name">Nom</Label>
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
                    <Label htmlFor="email">Your email</Label>
                    <Input
                        id="email"
                        type="email"
                        className={clsx("rounded-none py-1.5", {
                            "border border-red-500" : form.formState.errors.email?.message !== undefined,
                            "border border-[#33475B]" : form.formState.errors.email?.message === undefined
                        })}
                        {...form.register("email")}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="tel">Numéro de téléphone</Label>
                    {/* Pour les composants personnalisés comme MyPhoneInput, utilisez Controller */}
                    <Controller
                        name="tel"
                        control={form.control}
                        render={({ field }) => (
                            <MyPhoneInput
                                state={form.formState.errors.tel?.message}
                                {...field} // Passe les props de react-hook-form (value, onChange, onBlur)
                            />
                        )}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="password">Password</Label>
                    <InputPasswrd
                        state={form.formState.errors.password?.message}
                        {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                    )}
                </div>
                <Button
                    type="submit" // Très important pour déclencher la soumission du formulaire
                    className="w-full bg-primary rounded-none text-white border border-primary cursor-pointer hover:bg-white hover:text-primary"
                    disabled={isLoading} // Désactive le bouton pendant le chargement
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
            <div className='w-fit flex items-center mt-4'>
                <p className="mr-1">Already have an account ? </p>
                <Link href='/auth/login' className="text-secondary">Let&apos;s login</Link>
            </div>
        </section>
    );
}