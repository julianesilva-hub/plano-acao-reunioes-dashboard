import { RefreshCw, BarChart3, LogOut, Shield, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface HeaderProps {
  loading: boolean
  error: string | null
  lastUpdate: string
  totalRecords: number
  onRefresh: () => void
}

export function Header({ loading, error, lastUpdate, totalRecords, onRefresh }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <BarChart3 size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900 leading-tight">
            Plano de Ação — Reuniões Estratégicas
          </h1>
          <p className="text-[11px] text-gray-500 leading-tight">
            Monitoramento Executivo · Governança Corporativa
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Status de dados */}
        {!loading && !error && lastUpdate && (
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5 hidden sm:flex">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            {totalRecords} registros · {lastUpdate}
          </span>
        )}
        {loading && (
          <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block animate-pulse" />
            Carregando...
          </span>
        )}
        {error && (
          <span className="text-[11px] text-red-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            Erro ao carregar
          </span>
        )}

        {/* Botão atualizar */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          Atualizar
        </button>

        {/* Separador */}
        <div className="w-px h-5 bg-gray-200 hidden sm:block" />

        {/* Usuário autenticado */}
        {user && (
          <div className="flex items-center gap-2">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-7 h-7 rounded-full border border-gray-200 flex-shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <User size={14} className="text-brand-600" />
              </div>
            )}
            <div className="hidden md:block">
              <p className="text-[12px] font-medium text-gray-800 leading-tight">{user.responsavel}</p>
              <div className="flex items-center gap-1">
                {user.acesso === 'ADM' ? (
                  <Shield size={9} className="text-brand-500" />
                ) : (
                  <User size={9} className="text-gray-400" />
                )}
                <p className="text-[10px] text-gray-400 leading-tight">{user.acesso}</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sair"
              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-500 px-2 py-1.5 rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
