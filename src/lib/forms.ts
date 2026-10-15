/** Shared Web3Forms submission helper. Submissions are delivered to the inbox linked to this access key. */
export type Web3FormPayload = Record<string, string | boolean | undefined>;

function getWeb3FormsAccessKey(): string {
  const key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!key) {
    throw new Error(
      "VITE_WEB3FORMS_ACCESS_KEY is missing. Copy .env.example to .env and set your Web3Forms access key.",
    );
  }
  return key;
}

export async function submitWeb3Form(payload: Web3FormPayload): Promise<void> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: getWeb3FormsAccessKey(), ...payload }),
  });
  const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? "Submission failed");
  }
}
