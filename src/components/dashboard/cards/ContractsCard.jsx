const CONTRACTS = [
  {
    label: 'Orbit A',
    address: import.meta.env?.VITE_ORBIT_A_ADDRESS ?? '0x0000000000000000000000000000000000000000',
  },
  {
    label: 'Orbit B',
    address: import.meta.env?.VITE_ORBIT_B_ADDRESS ?? '0x0000000000000000000000000000000000000000',
  },
];

const shorten = (value) => {
  if (!value || value.length < 10) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
};

const ContractsCard = () => {
  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).catch(() => {});
  };

  return (
    <div className="bg-white/60 dark:bg-[#191932] rounded-[10px] p-[18px] border-2 border-[#E5E7EB] dark:border-[#141429]">
      <p className="text-[#0a0a0a] dark:text-[#7D40FF] text-lg font-semibold">Contracts</p>

      {CONTRACTS.map((contract) => (
        <div key={contract.label}>
          <div className="flex items-center justify-between my-[10px]">
            <div className="text-lg font-semibold">
              <span className="text-[#7D40FF] mr-4">{contract.label}</span>
              <span className="text-[#0a0a0a] dark:text-[#01F1E3]">{shorten(contract.address)}</span>
            </div>
            <button type="button" onClick={() => copyToClipboard(contract.address)} className="cursor-pointer">
              <img src="icons/copy.svg" alt="Copy contract address" />
            </button>
          </div>
          {contract.label !== 'Orbit B' && <hr className="text-[#E5E7EB] dark:text-[#141429] my-[10px]" />}
        </div>
      ))}
    </div>
  );
};

export default ContractsCard;
