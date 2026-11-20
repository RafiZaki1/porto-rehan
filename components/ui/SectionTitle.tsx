// Judul section standar: label mono di atas, judul besar dengan aksen gradasi di belakang.

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string; // kata yang diberi gradasi, harus bagian dari title
};

export default function SectionTitle({ id, eyebrow, title, highlight }: Props) {
  let content: React.ReactNode = title;
  if (highlight && title.includes(highlight)) {
    const [before, after] = title.split(highlight);
    content = (
      <>
        {before}
        <span className="heading-gradient">{highlight}</span>
        {after}
      </>
    );
  }

  return (
    <div className="mb-12">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-tight">
        {content}
      </h2>
    </div>
  );
}
