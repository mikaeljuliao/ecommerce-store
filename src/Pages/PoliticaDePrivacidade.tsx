import { useEffect } from 'react'

export default function PoliticaDePrivacidade() {
 
  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-4xl mx-auto px-6 py-24">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold mb-8">
          Política de
          <span className="text-[rgb(var(--primary))]"> Privacidade</span>
        </h1>

        {/* CONTEÚDO */}
        <div className="space-y-6 text-[rgb(var(--text-muted))] leading-relaxed">

          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade
            descreve como coletamos, usamos e protegemos as informações dos
            usuários da <strong>SetupStore</strong>.
          </p>

          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-2">
              1. Coleta de informações
            </h2>
            <p>
              Coletamos informações fornecidas diretamente pelo usuário, como
              nome, e-mail e dados de contato, além de informações relacionadas
              à navegação, como páginas visitadas e interações no site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-2">
              2. Uso das informações
            </h2>
            <p>
              As informações coletadas são utilizadas para melhorar a experiência
              do usuário, processar pedidos, oferecer suporte e aprimorar nossos
              serviços e funcionalidades.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-2">
              3. Compartilhamento de dados
            </h2>
            <p>
              A SetupStore não vende ou compartilha informações pessoais com
              terceiros, exceto quando necessário para cumprir obrigações legais
              ou operar funcionalidades essenciais do serviço.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-2">
              4. Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger
              os dados pessoais contra acesso não autorizado, perda ou uso indevido.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[rgb(var(--text))] mb-2">
              5. Alterações nesta política
            </h2>
            <p>
              Esta política pode ser atualizada periodicamente. Recomendamos que
              o usuário revise esta página regularmente para se manter informado
              sobre eventuais mudanças.
            </p>
          </div>

          <p className="pt-6 text-sm">
            Última atualização: {new Date().getFullYear()}
          </p>

        </div>
      </div>
    </section>
  )
}
