import jwt from 'jsonwebtoken';

// Verificar se a variável de ambiente JWT_SECRET está definida
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  // Caso não esteja definida, exibe erro e para a execução
  console.error('[FATAL] JWT_SECRET não definida em produção. Configure no .env.production');
  process.exit(1); // Interrompe a execução do servidor
}

// Definição da interface para o payload do JWT
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

// Função para assinar o token JWT
export function signToken(payload: JWTPayload): string {
  if (!payload || typeof payload !== 'object') {
    throw new Error("Payload deve ser um objeto válido e não pode ser undefined");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}


// Função para decodificar o token JWT sem verificar a assinatura
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
