# Container (Injeção de Dependência)

O Container é responsável por gerenciar **instâncias únicas** e **injeção de dependências**.

## 1. `Container.get(target: Constructor, providers: Constructor[])`

- Retorna uma instância da classe solicitada.
- Só funciona se:
  1. A classe estiver registrada em `providers` do módulo.
  2. A classe estiver marcada com `@Injectable()`.
- Se já existir instância, retorna a mesma (singleton).

## 2. Como funciona

```ts
@Injectable()
class UserService {}

const service = Container.get(UserService, [UserService]);
```

- `UserService` precisa estar listado nos `providers` do módulo.
- Caso contrário, será lançado um erro explicando que a classe precisa ser registrada.

## 3. Resolução de dependências

- O Container lê o metadado `design:paramtypes` para descobrir os tipos do construtor.
- Chama recursivamente `Container.get` para cada dependência.
- Cria a instância final do service com todas as dependências resolvidas.

## 4. Benefícios

- Sem instâncias duplicadas (singleton).
- Força regras de injeção iguais ao NestJS.
- Erros claros se esquecer de registrar um provider ou esquecer `@Injectable()`.
