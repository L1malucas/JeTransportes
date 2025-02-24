"use client";

import React from "react";
import { Phone, MessageSquare, Linkedin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoContent() {
  return (
    <div>
      {/* Card do Proprietário - clicável para WhatsApp */}
      <a
        href="https://wa.me/5571981127022"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <Card className="mb-4 hover:bg-gray-50 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-base">Contato do Proprietário</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Nome</p>
                  <p className="text-sm text-gray-600">
                    Ari - Proprietário do J&E Transportes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Telefone/WhatsApp</p>
                  <p className="text-sm text-gray-600">(71) 98112-7022</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>

      {/* Card do Desenvolvedor - clicável para LinkedIn */}
      <a
        href="https://www.linkedin.com/in/lucasl1ma/"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <Card className="mb-4 hover:bg-gray-50 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-base">
              Contato do Desenvolvedor
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Nome</p>
                  <p className="text-sm text-gray-600">
                    Lucas Lima - Engenheiro de Software
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Linkedin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Contato (Linkedin)</p>
                  <p className="text-sm text-gray-600">
                    linkedin.com/in/lucaslimacoder/
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </a>

      {/* Sugestões */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Envie sua Sugestão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                className="w-full p-2 border rounded-lg h-24"
                placeholder="Sua sugestão ou comentário"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Enviar Sugestão
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
