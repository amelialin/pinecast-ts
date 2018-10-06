export type Fun<A, B> = (a: A) => B;

const _compose1 = <A, B>(f: Fun<A, B>) => (a: A): B => f(a);
const _compose2 = <A, B, C>(g: Fun<B, C>, f: Fun<A, B>) => (a: A): C => g(f(a));
const _compose3 = <A, B, C, D>(h: Fun<C, D>, g: Fun<B, C>, f: Fun<A, B>) => (
  a: A,
): D => h(g(f(a)));
const _compose4 = <A, B, C, D, E>(
  i: Fun<D, E>,
  h: Fun<C, D>,
  g: Fun<B, C>,
  f: Fun<A, B>,
) => (a: A): E => i(h(g(f(a))));
const _compose5 = <A, B, C, D, E, F>(
  j: Fun<E, F>,
  i: Fun<D, E>,
  h: Fun<C, D>,
  g: Fun<B, C>,
  f: Fun<A, B>,
) => (a: A): F => j(i(h(g(f(a)))));

function compose<A, B>(f: Fun<A, B>): Fun<A, B>;
function compose<A, B, C>(g: Fun<B, C>, f: Fun<A, B>): Fun<A, C>;
function compose<A, B, C, D>(
  h: Fun<C, D>,
  g: Fun<B, C>,
  f: Fun<A, B>,
): Fun<A, D>;
function compose<A, B, C, D, E>(
  i: Fun<D, E>,
  h: Fun<C, D>,
  g: Fun<B, C>,
  f: Fun<A, B>,
): Fun<A, E>;
function compose<A, B, C, D, E, F>(
  j: Fun<E, F>,
  i: Fun<D, E>,
  h: Fun<C, D>,
  g: Fun<B, C>,
  f: Fun<A, B>,
): Fun<A, F>;

function compose() {
  switch (arguments.length) {
    case 1:
      return _compose1(arguments[0]);
    case 2:
      return _compose2(arguments[0], arguments[1]);
    case 3:
      return _compose3(arguments[0], arguments[1], arguments[2]);
    case 4:
      return _compose4(arguments[0], arguments[1], arguments[2], arguments[3]);
    case 5:
      return _compose5(
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3],
        arguments[4],
      );
    default:
      return (value: any) =>
        Array.from(arguments).reduceRight((acc, cur) => acc(cur), value);
  }
}

export default compose;
