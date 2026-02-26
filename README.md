# React + TypeScript + Vite

Projeto em React + TypeScript + Tailwind, que na primeira execução exibe uma tela para o usuário escolher uma data/hora futura e, após a confirmação, renderiza um contador regressivo de dias/horas/minutos/segundos, atualizado em tempo real. A data escolhida é persistida no navegador para manter o estado entre recarregamentos.

Destaques de implementação (decisões e motivos)

Validação de data (mínimo 1 minuto no futuro)

No input: min={agora + 1 minuto} → evita selecionar “agora” e datas anteriores via UI.

No submit: validação final garante a regra mesmo se o usuário digitar manualmente (ex.: if (d.getTime() < Date.now() + 60 * 1000) ...).


A maior parte dessas decisões foi tomada devido a erros e alertas do ESLint e eu fui reagindo aos seus avisos:


Storage wrapper (shared/storage.ts)

Decisão: encapsular localStorage em funções (get/set/clear) para evitar try/catch espalhado e facilitar trocar o armazenamento depois.

Por quê: resolve dois problemas comuns ao lidar com APIs do navegador: verbosidade do tratamento de erros e acoplamento tecnológico.

Cálculo de tempo com função pura (utils/time.ts)

Decisão: usar funções puras para converter diferença em ms → {days, hours, minutes, seconds}.

Por quê: é mais confiável, fácil de testar e reduz bugs em cálculo de tempo.

Timer sem drift (hook useCountdown)

Decisão importante: evitar drift do setInterval.

Como: usar setTimeout alinhado ao próximo “segundo cheio” (1000 - (now % 1000)) e parar em 0 para evitar renders desnecessários.

Extra: setState acontece apenas dentro do callback do setTimeout, evitando atualizações síncronas no corpo do effect.

Componente de UI reutilizável (TimeUnitCard.tsx)

Decisão: componente pequeno e reutilizável para cada unidade de tempo.

Por quê: mantém o layout limpo e facilita ajustes visuais/consistência.

Modal React (sem <dialog> e sem effects)

Decisão: modal 100% React (overlay) para evitar problemas de comportamento (ex.: StrictMode) e manter previsibilidade.

Garantias:

✅ Sem setState dentro de effect

✅ Sem Date.now() no render (apenas no initializer do useState)

✅ Fecha no ESC e ao clicar fora

✅ Monta somente quando open no pai
