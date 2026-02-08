import { useEffect } from 'react'

export default function TrocasEDevolucoes() {
  
  return (
    <section className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold mb-6">
          Trocas e
          <span className="text-[rgb(var(--primary))]"> Devoluções</span>
        </h1>

        {/* CONTEÚDO */}
        <div className="space-y-6 text-[rgb(var(--text-muted))] leading-relaxed">

          <p>
            Na <strong className="text-[rgb(var(--text))]">SetupStore</strong>,
            sua satisfação é prioridade. Por isso, seguimos uma política de
            trocas e devoluções simples, transparente e de acordo com o
            Código de Defesa do Consumidor.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Prazo para troca ou devolução
          </h2>

          <p>
            Você pode solicitar a troca ou devolução de um produto em até
            <strong> 7 dias corridos</strong> após o recebimento,
            conforme previsto em lei.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Condições para troca
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>O produto deve estar sem sinais de uso</li>
            <li>Embalagem original preservada</li>
            <li>Acompanhado de todos os acessórios</li>
            <li>Nota fiscal ou comprovante de compra</li>
          </ul>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Produtos com defeito
          </h2>

          <p>
            Caso o produto apresente defeito de fabricação, a troca poderá
            ser solicitada dentro do prazo legal, sem custo adicional.
          </p>

          <h2 className="text-lg font-semibold text-[rgb(var(--text))]">
            Como solicitar
          </h2>

          <p>
            Para iniciar o processo de troca ou devolução, entre em contato
            com nosso atendimento informando o número do pedido e o motivo
            da solicitação.
          </p>

          <p>
            Após a análise, você receberá as instruções para envio do produto.
          </p>

        </div>
      </div>
    </section>
  )
}
