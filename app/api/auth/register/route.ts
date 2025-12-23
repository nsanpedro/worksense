import { NextRequest, NextResponse } from 'next/server'

// En modo demo, el registro está deshabilitado
// Los usuarios deben usar las cuentas de demo predefinidas
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Registro deshabilitado en modo demo. Usa las cuentas de demo predefinidas.',
      demoAccounts: [
        { email: 'pm@worksense.demo', role: 'PM' },
        { email: 'em@worksense.demo', role: 'EM' },
        { email: 'tech@worksense.demo', role: 'Tech Lead' },
        { email: 'stakeholder@worksense.demo', role: 'Stakeholder' },
      ],
      password: 'demo123'
    },
    { status: 400 }
  )
}
