'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';

const DoapXepTable = () => {
  const [xepData, setXepData] = useState<XepItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doapUrl =
          'https://raw.githubusercontent.com/monal-im/Monal/refs/heads/develop/monal.doap';

        const response = await axios.get(doapUrl);
        const result: ApiResponse = await parseStringPromise(response.data);
        const implementations = result['rdf:RDF'].Project[0].implements || [];

        const xeps: XepItem[] = implementations
          .filter((impl) => impl['xmpp:SupportedXep'])
          .flatMap((impl) => impl['xmpp:SupportedXep'])
          .map((xep) => ({
            id: (() => {
              const resource = xep['xmpp:xep']?.[0]?.['$']?.['rdf:resource'];
              if (resource) {
                return resource.split('/').pop()?.split('.')[0]?.toUpperCase() || '';
              } else {
                return '';
              }
            })(),

            status: xep['xmpp:status']?.[0] || '',
            since: xep['xmpp:since']?.[0] || '',
            note: xep['xmpp:note']?.[0] || '',
          }));

        setXepData(xeps);
      } catch {
        setError('Veri alınırken hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h3 className="text-2xl font-bold my-4 text-start">Implemented XEPs</h3>
      <p>
        You can check the complete list of supported XEPs at https://xmpp.org/software/monal-im/
      </p>
      <table className="w-full border my-4 border-gray-300 shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">XEP</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Since</th>
          </tr>
        </thead>
        <tbody>
          {xepData.length > 0 ? (
            xepData
              .filter(
                (item) =>
                  item.status.toLowerCase() === 'complete' ||
                  item.status.toLowerCase() === 'partial',
              )
              .map((xep) => (
                <tr key={xep.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border">
                    {xep.id} <br />
                    {xep.note}
                  </td>
                  <td className="px-4 py-2 border">{xep.status}</td>
                  <td className="px-4 py-2 border">{xep.since}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-2 border text-center">
                Veri bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3 className="text-2xl font-bold my-4 text-start">Planned XEPs</h3>
      <table className="w-full border border-gray-300 shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 border">XEP</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {xepData.length > 0 ? (
            xepData
              .filter((item) => item.status.toLowerCase() === 'planned')
              .map((xep) => (
                <tr key={xep.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 border">
                    {xep.id} <br />
                    {xep.note}
                  </td>
                  <td className="px-4 py-2 border">{xep.status}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={3} className="px-4 py-2 border text-center">
                Veri bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default DoapXepTable;
