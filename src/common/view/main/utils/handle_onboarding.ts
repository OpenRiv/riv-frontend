export function handleOnboarding({ url }: handleOnboardingProps) {
  const width = 650;
  const height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.outerHeight - height) / 2;

  window.open(
    url,
    "_blank",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
}

type handleOnboardingProps = {
  url: string;
};
