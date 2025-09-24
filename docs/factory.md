# Factory

A Factory é responsável por **criar a aplicação Express**, registrar módulos, controllers e rotas automaticamente.

## 1. `create(rootModule: Constructor)`

- Ponto de entrada para criar a aplicação.
- Recebe o módulo raiz (`AppModule`).
- Inicializa o Express e chama `registerModule`.

## 2. `registerModule(moduleClass: Constructor, app: Express)`

- Registra **imports** recursivamente.
- Registra controllers do módulo.
- Valida se o módulo possui `@Module()`.

## 3. `registerController(controllerClass: Constructor, app: Express, moduleClass: Constructor)`

- Cria a instância do controller usando `createController`.
- Itera sobre os métodos do controller e registra as rotas no Express.
- Cada rota respeita os metadados `@Get` (ou futuros decorators HTTP).

## 4. `createController(controllerClass: Constructor<T>, moduleClass: Constructor)`

- Obtém os **providers** do módulo.
- Resolve as dependências injetáveis do controller.
- Garante que todas as dependências estejam marcadas com `@Injectable()` e registradas no módulo.
- Retorna uma instância pronta do controller.

## 5. `registerRoute(controllerInstance, method, router)`

- Cria a rota no Express baseada nos metadados do método.
- Usa `method.call(controllerInstance, req, res)` para executar o método no contexto correto.
- Trata retorno JSON e erros internos.
