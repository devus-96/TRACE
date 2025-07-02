"use client"
import { Button } from "@/components/ui/button"
import clsx from "clsx";
import { LoaderCircle,  } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { MoveRight, MoveLeft } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import { ClipboardCheck, Clipboard } from 'lucide-react';
import { toast } from "sonner"

export default function Workflow3 () {
    const [isLoading, setIsLoading] = useState(true);
    const systemSelected = useRef('windows')
    const [response, setResponse] = useState<string | null>('sdfdsfsdf')
    const [copy, setCopy] = useState(false)

    function connect () {
        setIsLoading(true)
        try {
            setResponse('sdfdsfsdf')
        } catch(err) {

        } finally {
            setIsLoading(false)
        }
    }

    function copyToClipboardLegacy(text: string): boolean {
        let textArea: HTMLTextAreaElement | undefined;
        try {
          textArea = document.createElement("textarea");
          textArea.value = text;
      
          // Éviter que le textarea ne soit visible ou n'affecte le défilement
          textArea.style.position = "fixed";
          textArea.style.top = "0";
          textArea.style.left = "0";
          textArea.style.width = "2em";
          textArea.style.height = "2em";
          textArea.style.padding = "0";
          textArea.style.border = "none";
          textArea.style.outline = "none";
          textArea.style.boxShadow = "none";
          textArea.style.background = "transparent";
      
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select(); // Sélectionne le texte à copier
      
          // Tente de copier le texte sélectionné
          const successful = document.execCommand("copy");
          if (successful) {
            toast("copié dans le presse-papiers")
            setCopy(true)
          } else {
            toast("Échec de la copie")
            setCopy(false)
          }
          return successful;
        } catch (err) {
          toast("Échec de la copie")
          setCopy(false)
          console.log(err)
          return false;
        } finally {
          // Supprimer le textarea du DOM
          if (textArea && document.body.contains(textArea)) {
            document.body.removeChild(textArea);
          }
        }
      }

    async function copyToClipboardModern(text: string) {
        if (!navigator.clipboard) {
          console.warn("L'API Clipboard n'est pas disponible dans ce navigateur.");
          // Fallback à l'ancienne méthode si l'API moderne n'est pas supportée
          return copyToClipboardLegacy(text);
        }
      
        try {
          await navigator.clipboard.writeText(text);
          toast("copié dans le presse-papiers")
          setCopy(true)
        } catch (err) {
          toast("Échec de la copie")
          // Un autre fallback ou gestion d'erreur spécifique
          setCopy(false)
        }
      }

    useEffect(() => {
        const value = localStorage.getItem('systemSelected')
        if (value) {
            systemSelected.current = value
        }
        connect()
    }, [])
    return (
        <section className="relative w-full flex justify-center">
            <div className="w-full flex flex-col items-center max-w-[850px] space-y-8 mt-8">
                <h1 className="font-semibold text-3xl text-primary text-center">Install your first TRACE Agent</h1>
                <div className="w-[60%] text-textColor font-light">
                    <p>The trace universal telemetry aganet collects logs and metrics from your systems and applications, you need to connect at least 1 agent even if its on your work station.</p>
                </div>
                <div className="w-[70%] flex items-center justify-between px-1 py-1 bg-secondary/20 text-textColor">
                    <div className="space-x-8 flex items-center">
                        {isLoading && <LoaderCircle className="h-4 w-4 animate-spin ml-2" />}
                        {isLoading ? <p>Waiting for agent to connect </p> : <p>Connection complet </p>}
                    </div>
                    <Button type="submit" disabled={isLoading} className={clsx("rounded-none w-fit cursor-pointer", {
                            'bg-secondary': !isLoading,
                            'bg-primary': isLoading,
                        })}>Finish<MoveRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
                <Link href='/auth/workflow2' className="w-[70%] flex items-center space-x-2 text-secondary">
                    <MoveLeft className="h-4 w-4 ml-2" />
                    <p>select another platform</p>
                </Link>
                <div className="w-[70%] flex items-center space-x-2 text-textColor">
                    <Image src={`/${systemSelected.current}.svg`} alt="" width={80} height={80} />
                    <p>Install the trace agent on {systemSelected.current}</p>
                </div>
                <div className="w-[70%]">
                        <div className="w-full border-b">
                            <div className="w-fit border-b-2 border-secondary">
                                <p>PowerShell</p>
                            </div>
                            <div className="w-full bg-[#D9D9D9] min-h-14 p-4">
                                <Button
                                    variant="outline"
                                    className="w-8 h-8 cursor-pointer float-right"
                                    onClick={() => {
                                        if (response) {
                                            copyToClipboardModern(response)
                                        }
                                    }}
                                    >
                                    {copy ? <ClipboardCheck size={24} /> : <Clipboard size={24} />}
                                </Button>
                                <div>
                                    <p>{response}</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    )
}